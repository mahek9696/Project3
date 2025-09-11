import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  // const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  // const dispatch = useDispatch();

  // function handleFetchOrderDetails(getId) {
  //   dispatch(getOrderDetailsForAdmin(getId));
  // }

  // useEffect(() => {
  //   dispatch(getAllOrdersForAdmin());
  // }, [dispatch]);

  // console.log(orderDetails, "orderList");

  // useEffect(() => {
  //   if (orderDetails !== null) setOpenDetailsDialog(true);
  // }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {orderList && orderList.length > 0
              ? orderList.map((orderItem) => ( */}
            <TableRow>
              <TableCell>{/* {orderItem?._id} */}12121</TableCell>
              <TableCell>
                {/* {orderItem?.orderDate.split("T")[0]} */}
                12-12-11
              </TableCell>
              <TableCell>
                {/* <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge> */}
                InTransist
              </TableCell>
              <TableCell>{/* ${orderItem?.totalAmount} */}12232</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={
                    setOpenDetailsDialog

                    //   () => {
                    //   setOpenDetailsDialog(false);
                    //   dispatch(resetOrderDetails());
                    // }
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setOpenDetailsDialog(true)}
                      // onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <AdminOrderDetailsView
                  // orderDetails={orderDetails}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
            {/* ))
              : null} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
