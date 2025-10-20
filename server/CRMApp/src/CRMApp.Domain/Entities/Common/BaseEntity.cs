namespace CRMApp.Domain.Common
{
    public abstract class BaseEntity
    {
        public Guid Id { get; protected set; }
        public DateTime CreatedDate { get; protected set; }
        public DateTime? UpdatedDate { get; protected set; }
        public string CreatedByUserName { get; protected set; }
        public string? UpdatedByUserName { get; protected set; }

        protected BaseEntity()
        {
        }

        // Metodlar
        public void SetCreatedBy(string userCode)
        {
            if (!string.IsNullOrWhiteSpace(userCode))
            {
                CreatedByUserName = userCode;
                CreatedDate = DateTime.UtcNow;
            }
        }

        public void SetUpdatedBy(string userCode)
        {
            if (!string.IsNullOrWhiteSpace(userCode))
            {
                UpdatedByUserName = userCode;
                UpdatedDate = DateTime.UtcNow;
            }
        }
    }
}
