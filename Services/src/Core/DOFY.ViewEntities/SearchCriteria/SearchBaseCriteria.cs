namespace DOFY.ViewEntities
{
    public class SearchBaseCriteria
    {
        public int? OffsetStart { get; set; }

        public int? RowsPerPage { get; set; }

        public string SortOrder { get; set; }

        public string SortOrderColumn { get; set; }

        public string? SearchText { get; set; }

        public string? IsPublic { get; set; }
    }
}
