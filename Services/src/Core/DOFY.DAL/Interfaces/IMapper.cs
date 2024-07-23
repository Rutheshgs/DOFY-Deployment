namespace DOFY.DAL.Interfaces;

using Dapper;

public interface IMapper<out TEntity>
{
    TEntity Map(SqlMapper.GridReader reader);
}
