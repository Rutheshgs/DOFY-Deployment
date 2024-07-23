using DOFY.Logger;

namespace DOFY.Admin.API.Filters;

public class APIExceptionFilter : ExceptionFilterAttribute
{
    public APIExceptionFilter()
    {

    }

    public override void OnException(ExceptionContext context)
    {
        SeriLogger.Error(context.Exception, "Internal Server Error Occur.");
        base.OnException(context);
    }
}
