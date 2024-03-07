import QAAdminComponents from "../Components/QAAdminComponents";
import FeedbackAdminComponents from "../Components/FeedbackAdminComponents";
import DiscussionAdminComponents from "../Components/DiscussionAdminComponents";
import SuggestionsAdminCoponents from "../Components/SuggestionsAdminCoponents";
const AdminPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
          <DiscussionAdminComponents />
          <QAAdminComponents />
          <FeedbackAdminComponents />
          <SuggestionsAdminCoponents />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
