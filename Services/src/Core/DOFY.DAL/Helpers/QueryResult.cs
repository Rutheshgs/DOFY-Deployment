﻿namespace DOFY.DAL.Helpers;

using System;

public class QueryResult
{
    /// <summary>
    /// The _result
    /// </summary>
    private readonly Tuple<string, dynamic> result;

    /// <summary>
    /// Initializes a new instance of the <see cref="QueryResult" /> class.
    /// </summary>
    /// <param name="sql">SQL parameter</param>
    /// <param name="param">dynamic type parameter</param>
    public QueryResult(string sql, dynamic param)
    {
        this.result = new Tuple<string, dynamic>(sql, param);
    }

    /// <summary>
    /// Gets the SQL.
    /// </summary>
    public string Sql
    {
        get
        {
            return this.result.Item1;
        }
    }

    /// <summary>
    /// Gets the parameter.
    /// </summary>
    public dynamic Param
    {
        get
        {
            return this.result.Item2;
        }
    }
}
