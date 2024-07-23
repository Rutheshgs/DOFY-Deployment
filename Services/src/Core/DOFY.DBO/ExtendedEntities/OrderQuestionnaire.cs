﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOFY.DBO
{
    public  class OrderQuestionnaire : EntityBase
    {
        public long? OrderId { get; set; }

        public IEnumerable<Questionnaire> Sections { get; set; }

        public IEnumerable<QuestionnaireResponses> Response { get; set; }
    }
}
