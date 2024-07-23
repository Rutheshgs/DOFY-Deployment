namespace DOFY.Public.API.Controllers;

[Route("v1/auth")]
public class AuthController : BaseController<IPublicAuthModel, Logins>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicAuthModel authModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public AuthController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicAuthModel iAuthModel, CountryContext requestContext) 
        : base(iAuthModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.authModel = iAuthModel;
        this.requestContext = requestContext;
    }
   
    [HttpGet]
    [AllowAnonymous]
    [Route("SignIn/{userName}")]
    public async Task<IActionResult> SignIn(string userName)
    {
        if (userName is null)
        {
            return BadRequest();
        }

        var result = await this.Contract.Login(userName);
        if (result is null)
        {
            return Content("New User");
        }

        return Ok(result);
    }


    [HttpGet]
    [AllowAnonymous]
    [Route("ForgetPassword/{email}")]
    public async Task<IActionResult> ForgetPassword(string email)
    {
        if (email is null)
        {
            return BadRequest();
        }

        var result = await this.Contract.ForgetPassword(email);
        if (result is null)
        {
            return Content("New User");
        }

        return Ok(result);
        //if (email is null)
        //{
        //    return BadRequest();
        //}
        //if (!await this.Contract.ValidateUserAsync(email)) { return Content("Not Valid User"); }
        //Logins result = await this.Contract.ForgetPassword(email);
        //if (result is null)
        //{
        //    return Content("You are not Registered user.");
        //}

        //return Ok(result);
    }


    [HttpPost]
    [AllowAnonymous]
    [Route("authenticate/{userName}/{password}")]
    public async Task<IActionResult> Authenticate(string userName, string password)
    {
        if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password)) { return BadRequest(); }
        var result = await this.Contract.AuthenticateWithOTP(userName, password);
        if (result is null) { return Content("not valid user"); }
        var webtoken = await this.GenerateJSONWebToken(result);
        if (webtoken is null) { return Unauthorized(); }

        return Ok(webtoken);
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("AuthenticateWithPassword/{userName}/{password}")]
    public async Task<IActionResult> AuthenticateWithPassword(string userName, string password)
    {
        if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password)) { return BadRequest(); }       
        Logins result = await this.Contract.AuthenticateWithPassword(userName, password);
        if (result is null) { return Content("Invalid Credentials"); }
        var webtoken = await this.GenerateJSONWebToken(result);
        if (webtoken is null) { return Unauthorized(); }

        return Ok(webtoken);
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("ResetPasswordUae/{userName}/{password}")]
    public async Task<IActionResult> ResetPassword(string userName, string password)
    {
        var result = await this.Contract.ResetPasswordUae(userName, password);

        if (result is null)
        {
            return Content("Invalid Credentials");
        }

        return Ok(result);
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("RefreshToken/{token}")]
    public async Task<IActionResult> RefreshToken(string token)
    {
        if (token is null)
        {
            return BadRequest("Invalid client request");
        }

        string name = this.GetName(token);
        if (name.Equals("JWT expired")) { return BadRequest($"JWT expired. Go to Login Page"); }
        var result = this.Contract.GetLoginsDetailsbyUserName(name);
        if (result is null) { return BadRequest("Invalid Token"); };

        var webToken = await this.GenerateJSONWebToken(result);
        if (webToken is null) { return default; }

        return Ok(webToken);

    }

    private async Task<object> GenerateJSONWebToken(Logins loginData)
    {
        if (loginData is not null)
        {
            Person person = this.Contract.GetPersonByLoginId(loginData.Id);
            if (person is null) { return default; }
            var token = new JwtTokenBuilder()
                        .AddSecurityKey(JwtSecurityKey.Create(this.appConfiguration.Value.EncryptionConfiguration.ClientSecrect))
                        .AddSubject("Token")
                        .AddIssuer(this.appConfiguration.Value.EncryptionConfiguration.Issuer)
                        .AddAudience(this.appConfiguration.Value.EncryptionConfiguration.Audience)
                        .AddClaim("UserName", loginData.UserName)
                        .AddClaim("RoleId",  person?.RoleId?.ToString())
                        .AddExpiry(Convert.ToInt32(this.appConfiguration?.Value.EncryptionConfiguration?.ExpirationInMinutes))
                        .Build(this.CreateClaims(loginData, person));

            var result = new { 
                Token = token.Value, 
                PersonId = person.Id,
                FirstName = person.FirstName,
                Email = person.Email,
                MobileNumber = person.Mobile,
                AlternateNumber = person.SecondaryMobile
            };

            return await Task.FromResult(result);
        }

        return default;
    }

    protected sealed class JwtTokenBuilder
    {
        private SecurityKey securityKey = null;
        private string subject = string.Empty;
        private string issuer = string.Empty;
        private string audience = string.Empty;
        private Dictionary<string, string> claims = new Dictionary<string, string>();
        private int expiryInMinutes = 240;

        public JwtTokenBuilder AddSecurityKey(SecurityKey securityKey)
        {
            this.securityKey = securityKey;
            return this;
        }

        public JwtTokenBuilder AddSubject(string subject)
        {
            this.subject = subject;
            return this;
        }

        public JwtTokenBuilder AddIssuer(string issuer)
        {
            this.issuer = issuer;
            return this;
        }

        public JwtTokenBuilder AddAudience(string audience)
        {
            this.audience = audience;
            return this;
        }

        public JwtTokenBuilder AddClaim(string type, string value)
        {
            this.claims.Add(type, value);
            return this;
        }

        public JwtTokenBuilder AddClaims(Dictionary<string, string> claims)
        {
            this.claims.Union(claims);
            return this;
        }

        public JwtTokenBuilder AddExpiry(int expiryInMinutes)
        {
            this.expiryInMinutes = expiryInMinutes;
            return this;
        }

        public JwtToken Build(List<Claim> claims)
        {
            this.EnsureArguments();

            var token = new JwtSecurityToken(
                              issuer: this.issuer,
                              audience: this.audience,
                              claims: claims,
                              expires: DateTime.UtcNow.AddMinutes(this.expiryInMinutes),
                              signingCredentials: new SigningCredentials(
                                                        this.securityKey,
                                                        SecurityAlgorithms.HmacSha256));

            return new JwtToken(token);
        }

        private void EnsureArguments()
        {
            if (this.securityKey == null)
            {
                throw new ArgumentNullException("Security Key");
            }

            if (string.IsNullOrEmpty(this.subject))
            {
                throw new ArgumentNullException("Subject");
            }

            if (string.IsNullOrEmpty(this.issuer))
            {
                throw new ArgumentNullException("Issuer");
            }

            if (string.IsNullOrEmpty(this.audience))
            {
                throw new ArgumentNullException("Audience");
            }
        }
    }

    protected sealed class JwtToken
    {
        private JwtSecurityToken token;

        internal JwtToken(JwtSecurityToken token)
        {
            this.token = token;
        }

        public DateTime ValidTo => this.token.ValidTo;

        public string Value => new JwtSecurityTokenHandler().WriteToken(this.token);
    }

    [NonAction]
    private List<Claim> CreateClaims(Logins user, Person person)
    {
        if (person is not null)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.PrimaryGroupSid, Convert.ToString(person?.RoleId ?? 0)),
                    new Claim(ClaimTypes.PrimarySid, Convert.ToString(user.Id)),
                    new Claim(ClaimTypes.GivenName, Convert.ToString(person.FirstName)),
                    new Claim(ClaimTypes.Name, Convert.ToString(user.UserName)),
                    new Claim("Mobile", person.Mobile),
                    new Claim("Email", person.Email),
                    new Claim("PersonId", Convert.ToString(person.Id))
                };

            var identity = new ClaimsIdentity(claims, "local", "name", "role");
            this.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return claims;
        }

        return default;
    }

    [NonAction]
    private string GetName(string token)
    {
        try
        {
            var tokens = new JwtSecurityToken(jwtEncodedString: token);
            string Name = tokens.Claims.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name").Value;
            DateTime? validUpto = tokens.ValidTo.AddHours(DOFYConstants.JWT_MAX_AGE);

            var currentTime = DateTimeExtensions.GetCurrentIST();

            if (currentTime > validUpto)
            {
                return $"JWT expired";
            }

            return Name;
        }
        catch (Exception ex)
        {
            return ex.ToString();
        }
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("DecryptPassword/{encryptedPassword}")]
    public string DecryptPassword(string encryptedPassword)
    {
        if (encryptedPassword is null) { return default; }

        return this.Contract.DecryptPassword(encryptedPassword);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("ResendOTP/{userName}")]
    public async Task<IActionResult> ResendOTP(string userName)
    {
        var result = await this.Contract.ResendOTP(userName);
        if (result is null)
        {
            return Content("New User");
        }

        return Ok(result);
    }

}
