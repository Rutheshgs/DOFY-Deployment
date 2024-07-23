﻿namespace DOFY.DataMappers;

using AutoMapper;

public class EmailTemplatesEntityMapper : ITypeConverter<DBO.EmailTemplates, ViewEntities.EmailTemplates>
{
    public ViewEntities.EmailTemplates Convert(DBO.EmailTemplates source, ViewEntities.EmailTemplates destination, ResolutionContext context)
    {
        return new ViewEntities.EmailTemplates
        {
            Id = source?.Id ?? 0,
            TemplateName = source?.TemplateName,
            DisplayName = source?.DisplayName,
            Template = source?.Template,
            EmailGroupId = source.EmailGroupId,
            EmailSubject = source?.EmailSubject,
            EmailCC = source?.EmailCC,
            EmailBCC = source?.EmailBCC,
            SenderEmail = source?.SenderEmail,
            AdditionalInformation = source?.AdditionalInformation,
            AttachementRequired = source?.AttachementRequired ?? false,
            IncludeLoginInfo = source?.IncludeLoginInfo ?? false,
            VerCol = source?.VerCol ?? null,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
