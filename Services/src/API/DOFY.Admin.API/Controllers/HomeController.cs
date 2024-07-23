namespace DOFY.Admin.API.Controllers;

public class HomeController : Controller
{
    [HttpGet]
    public string Index()
    {
        return "DOFY Admin API V1";
    }
}