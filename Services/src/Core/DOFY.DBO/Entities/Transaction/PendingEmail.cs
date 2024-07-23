namespace DOFY.DBO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class PendingEmail : EntityBase
{
    public Guid EmailTemplateGroupId { get; set; }

    public bool IsProcessed { get; set; }

    public string Parms { get; set; }

    public string EmailTo { get; set; }

    public string EmailFrom { get; set; }

    public string Attachment { get; set; }

    public bool Active { get; set; }

    public long? RowOrder { get; set; }
}