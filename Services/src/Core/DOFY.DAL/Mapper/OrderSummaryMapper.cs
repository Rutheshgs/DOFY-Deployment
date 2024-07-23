namespace DOFY.DAL;

using Dapper;
using DOFY.DAL.Interfaces;
using DOFY.ViewEntities;

public class OrderSummaryMapper : IMapper<Orders>
{
    public Orders Map(SqlMapper.GridReader reader)
    {
        var order = reader.Read<Orders>(true);
        Orders result = new Orders();

        if (order?.Count() > 0)
        {
            result = order?.FirstOrDefault();
            result.Appointment = reader.Read<Appointment>(true)?.FirstOrDefault();
            result.AssigneeDetails = reader.Read<AssigneeDetailsViewModel>(true)?.FirstOrDefault();
            result.OrderDocuments = reader.Read<OrderDocuments>(true);
            result.QuestionnaireResponse = reader.Read<QuestionnaireResponses>(true);
            result.RepairParts = reader.Read<OrderParts>(true);
            result.OrderSpecificationsList = reader.Read<OrderSpecifications>(true);
            result.OrderHistoryList = reader.Read<OrderHistory>(true);
            result.Payout = reader.Read<OrderPayout>(true)?.FirstOrDefault();
        }

        return result;
    }
}
