namespace DOFY.Public.API.Controllers;

public class HomeController : Controller
{
    [HttpGet]
    public string Index()
    {
        return "DOFY Public API V1";
    }
}
