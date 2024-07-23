namespace DOFY.NotificationService
{
    using System.Collections.Generic;

    public interface ITaskChecker<TTask>
    {
        IEnumerable<TTask> FetchPendingTasks();

        void MarkTaskAsProcessed(TTask taskId);

        void UpdateRetryCount(TTask task);
    }
}
