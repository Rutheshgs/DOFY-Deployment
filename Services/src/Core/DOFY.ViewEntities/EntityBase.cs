using System.Runtime.Serialization;
using DOFY.Helper.Attributes;
using DOFY.Helper.Validators;


namespace DOFY.ViewEntities
{

    public class EntityBase
    {
        /// <summary>
        /// The validation errors
        /// </summary>
        private readonly ValidationErrors validationErrors;

        /// <summary>
        /// Initializes a new instance of the <see cref="EntityBase" /> class.
        /// </summary>
        protected EntityBase()
        {
            this.validationErrors = new ValidationErrors();
        }

        /// <summary>
        /// Gets or sets Entity Id that represents unique value.
        /// </summary>
        [DataMember]
        public long Id { get; set; }

        /// <summary>
        /// Gets or sets Represents entity created date.
        /// </summary>
        ///[DataMember]
        public DateTime? Created { get; set; }

        /// <summary>
        /// Gets or sets Represents who created the entity.
        /// </summary>
        [DataMember]
        public long CreatedBy { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether gets or sets Represents is Active or Not .
        /// </summary>
        [DataMember]
        public bool Active { get; set; } //= Helper.DOFYConstants.ACTIVESTATUS;

        /// <summary>
        /// Gets or sets Represents entity modified date.
        /// </summary>
        public DateTime? Modified { get; set; }

        /// <summary>
        /// Gets or sets Represents who modified the entity.
        /// </summary>
        public long ModifiedBy { get; set; }

        /// <summary>
        /// Gets a value indicating whether this instance is valid.
        /// </summary>
        [DBIgnore]
        public virtual bool IsValid
        {
            get
            {
                this.validationErrors.Clear();
                this.Validate();
                return this.ValidationErrors.Items.Count == 0;
            }
        }

        /// <summary>
        /// Gets the validation errors.
        /// </summary>
        [DBIgnore]
        public virtual ValidationErrors ValidationErrors
        {
            get { return this.validationErrors; }
        }

        /// <summary>
        /// Search the instance member based on the keyword.
        /// </summary>
        /// <param name="adminApproved">admin approved items search</param>
        /// <returns>Returns true if matches found.</returns>
        public virtual bool SearchByKeyword(bool? adminApproved)
        {
            return true;
        }

        /// <summary>
        /// Validates this instance.
        /// </summary>
        protected virtual void Validate()
        {
        }
    }
}
