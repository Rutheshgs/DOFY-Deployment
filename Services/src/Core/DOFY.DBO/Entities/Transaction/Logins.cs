namespace DOFY.DBO;

public class Logins : EntityBase
{
    public long CompanyId { get; set; }

    public string UserName { get; set; }

    public string PassWord { get; set; }

    public string Salt { get; set; }

    public string IVKey { get; set; }

    public long? RowOrder { get; set; }

}
