<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

const logout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="container-fluid">
            <!-- Page Header -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 class="mb-1">Ecommerce Dashboard</h2>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-0">
                                    <li class="breadcrumb-item"><Link :href="route('dashboard')">Home</Link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                        <div>
                            <button class="btn btn-primary">
                                <i class="ti ti-plus me-2"></i>Add New
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="row g-3 mb-4">
                <div class="col-xl-3 col-sm-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1">Total Sales</p>
                                    <h3 class="mb-0">$24,580</h3>
                                    <small class="text-success">
                                        <i class="ti ti-arrow-up"></i> 12.5% from last month
                                    </small>
                                </div>
                                <div class="bg-primary bg-opacity-10 rounded-circle p-3">
                                    <i class="ti ti-shopping-cart text-primary fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1">Total Orders</p>
                                    <h3 class="mb-0">1,248</h3>
                                    <small class="text-success">
                                        <i class="ti ti-arrow-up"></i> 8.2% from last month
                                    </small>
                                </div>
                                <div class="bg-success bg-opacity-10 rounded-circle p-3">
                                    <i class="ti ti-package text-success fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1">Total Customers</p>
                                    <h3 class="mb-0">8,456</h3>
                                    <small class="text-danger">
                                        <i class="ti ti-arrow-down"></i> 2.1% from last month
                                    </small>
                                </div>
                                <div class="bg-info bg-opacity-10 rounded-circle p-3">
                                    <i class="ti ti-users text-info fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-sm-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1">Total Revenue</p>
                                    <h3 class="mb-0">$95,420</h3>
                                    <small class="text-success">
                                        <i class="ti ti-arrow-up"></i> 15.8% from last month
                                    </small>
                                </div>
                                <div class="bg-warning bg-opacity-10 rounded-circle p-3">
                                    <i class="ti ti-currency-dollar text-warning fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row g-3 mb-4">
                <div class="col-xl-8">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-header bg-transparent border-0 p-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">Sales Overview</h5>
                                <select class="form-select form-select-sm" style="width: auto;">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 3 months</option>
                                    <option>Last year</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="sales-chart" style="height: 300px;" class="d-flex align-items-center justify-content-center text-muted">
                                <div>
                                    <i class="ti ti-chart-line fs-1 mb-2"></i>
                                    <p>Chart will be rendered here with ApexCharts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-header bg-transparent border-0 p-3">
                            <h5 class="mb-0">Recent Activities</h5>
                        </div>
                        <div class="card-body">
                            <div class="timeline">
                                <div class="timeline-item mb-3">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-primary bg-opacity-10 rounded-circle p-2">
                                                <i class="ti ti-shopping-bag text-primary"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-1 fs-6">New order received</h6>
                                            <p class="text-muted small mb-0">Order #12345 - $250.00</p>
                                            <small class="text-muted">5 minutes ago</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-item mb-3">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-success bg-opacity-10 rounded-circle p-2">
                                                <i class="ti ti-user-plus text-success"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-1 fs-6">New customer registered</h6>
                                            <p class="text-muted small mb-0">John Doe joined</p>
                                            <small class="text-muted">1 hour ago</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-item mb-3">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-warning bg-opacity-10 rounded-circle p-2">
                                                <i class="ti ti-package text-warning"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-1 fs-6">Product shipped</h6>
                                            <p class="text-muted small mb-0">Order #12340 shipped</p>
                                            <small class="text-muted">3 hours ago</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-item">
                                    <div class="d-flex">
                                        <div class="flex-shrink-0">
                                            <div class="bg-info bg-opacity-10 rounded-circle p-2">
                                                <i class="ti ti-star text-info"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                            <h6 class="mb-1 fs-6">New review received</h6>
                                            <p class="text-muted small mb-0">5 stars on Product XYZ</p>
                                            <small class="text-muted">5 hours ago</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Orders Table -->
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-transparent border-0 p-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0">Recent Orders</h5>
                                <Link :href="route('orders')" class="btn btn-sm btn-outline-primary">
                                    View All Orders
                                </Link>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Product</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>#12345</strong></td>
                                            <td>John Doe</td>
                                            <td>Product XYZ</td>
                                            <td>Nov 10, 2025</td>
                                            <td>$250.00</td>
                                            <td><span class="badge bg-success">Completed</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>#12344</strong></td>
                                            <td>Jane Smith</td>
                                            <td>Product ABC</td>
                                            <td>Nov 09, 2025</td>
                                            <td>$180.00</td>
                                            <td><span class="badge bg-warning">Pending</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>#12343</strong></td>
                                            <td>Mike Johnson</td>
                                            <td>Product DEF</td>
                                            <td>Nov 09, 2025</td>
                                            <td>$320.00</td>
                                            <td><span class="badge bg-info">Shipped</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>#12342</strong></td>
                                            <td>Sarah Wilson</td>
                                            <td>Product GHI</td>
                                            <td>Nov 08, 2025</td>
                                            <td>$450.00</td>
                                            <td><span class="badge bg-success">Completed</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>#12341</strong></td>
                                            <td>Tom Brown</td>
                                            <td>Product JKL</td>
                                            <td>Nov 08, 2025</td>
                                            <td>$200.00</td>
                                            <td><span class="badge bg-danger">Cancelled</span></td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary">View</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
