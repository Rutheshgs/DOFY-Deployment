namespace DOFY.Contracts;
public interface IPublicCarousalBannerModel : IBaseModel<ViewEntities.CarousalBanner>
{
    /// <summary>
    /// get carousalBanner.
    /// </summary>
    /// <returns> carousalBanner.</returns>
    IEnumerable<ViewEntities.CarousalBanner> GetCarousalBanner();
}