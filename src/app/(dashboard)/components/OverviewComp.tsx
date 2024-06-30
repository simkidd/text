"use client";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useOrderStore } from "@/lib/stores/order.store";
import { useProductStore } from "@/lib/stores/product.store";
import { useUserStore } from "@/lib/stores/user.store";
import { Chip, Card, Button, Skeleton, CardBody } from "@nextui-org/react";
import { SquareGanttChart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { formatCurrency } from "@/utils/helpers";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  revenuePerMonth: {
    [key: string]: number;
  };
  ordersPerMonth: {
    [key: string]: number;
  };
}

const OverviewComp = () => {
  const { user } = useAuthStore();
  const { users } = useUserStore();
  const { products } = useProductStore();
  const { orders } = useOrderStore();
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/admin/dashboard-stats");
        setDashboardData(res.data.dashboardStats);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: Object.values(dashboardData?.revenuePerMonth || {}),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Orders",
        data: Object.values(dashboardData?.ordersPerMonth || {}),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 gap-4">
      <Card className="col-span-1 lg:col-span-3 dark:bg-[#222327] text-white">
        <CardBody>
          <div className="flex gap-2 flex-col justify-between">
            <div className="w-full">
              {!user ? (
                <>
                  <Skeleton className="w-4/5 rounded-lg mb-2">
                    <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                </>
              ) : (
                <>
                  <p className="mb-2 font-medium text-lg">
                    {user?.firstname + " " + user?.lastname}
                  </p>
                  <div>
                    {user?.isAdmin && (
                      <Chip color="primary" size="sm">
                        Admin
                      </Chip>
                    )}
                    {user?.isSuperAdmin && (
                      <Chip color="warning" size="sm">
                        Super
                      </Chip>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="col-span-1 lg:col-span-2 dark:bg-[#222327] text-white">
        <CardBody>
          <div className="flex flex-col gap-2">
            <p>Products</p>
            <p>{products.length}</p>
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary bg-opacity-10 ms-auto">
            <SquareGanttChart size={32} />
          </div>
        </CardBody>
      </Card>
      <Card className="col-span-1 lg:col-span-2 dark:bg-[#222327] text-white">
        <CardBody>
          <div className="flex flex-col gap-2">
            <p>Customers</p>
            <p>{users.length}</p>
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary bg-opacity-10 ms-auto">
            <SquareGanttChart size={32} />
          </div>
        </CardBody>
      </Card>
      <Card className="col-span-1 lg:col-span-2 dark:bg-[#222327] text-white">
        <CardBody>
          <div className="flex flex-col gap-2">
            <p>Orders</p>
            <p>{orders.length}</p>
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary bg-opacity-10 ms-auto">
            <SquareGanttChart size={32} />
          </div>
        </CardBody>
      </Card>
      <Card className="col-span-1 lg:col-span-6 dark:bg-[#222327] text-white">
        <CardBody>
          <div className="mb-2 flex gap-2">
            <p className="font-medium text-lg">Total Revenue:</p>
            {isLoading ? (
              <Skeleton className="w-3/12 rounded-lg">
                <div className="h-4 w-3/12 rounded-lg bg-default-200"></div>
              </Skeleton>
            ) : (
              <p className="text-xl font-bold">
                {formatCurrency(dashboardData?.totalRevenue || 0, "NGN")}
              </p>
            )}
          </div>
          <div className="mb-4 flex gap-2">
            <p className="font-medium text-lg">Total Orders:</p>
            {isLoading ? (
              <Skeleton className="w-3/12 rounded-lg">
                <div className="h-4 w-3/12 rounded-lg bg-default-200"></div>
              </Skeleton>
            ) : (
              <p className="text-xl font-bold">{dashboardData?.totalOrders}</p>
            )}
          </div>
          <div className="w-full h-full">
            <Line data={chartData} options={chartOptions} className="w-full" />
          </div>
        </CardBody>
      </Card>

      <Card className="col-span-1 lg:col-span-3 h-fit bg-white dark:bg-[#222327]">
        <Calendar
          aria-label="Date (Read Only)"
          value={today(getLocalTimeZone())}
          // isReadOnly
          classNames={{
            content: "w-full",
            gridHeader: "dark:bg-transparent",
            headerWrapper: "dark:bg-transparent",
            cellButton: "dark:text-white",
            pickerHighlight: "bg-yellow-500",
          }}
        />
      </Card>
    </div>
  );
};

export default OverviewComp;
