import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
    return (
        <DashboardLayout title='Dashboard' description='Category management page for admin' type='admin'>
            <Category />
        </DashboardLayout>
    );
};

export default AdminCategoryPage;