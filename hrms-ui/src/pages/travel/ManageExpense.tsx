import { Badge, Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetTravelPlan } from '../../query/TravelPlanQuery';
import { useGetExpenseByTravelPlan, useVerifyTravelExpense } from '../../query/ExpenseQuery';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import { type TravelExpenseResponseType } from '../../types/TravelPlan';
import { useGetDocumentByUrl } from '../../query/DocumentQuery';
import SelectOption from '../../common/SelectOption';

function ManageExpense() {
  const [selectedPlanId, setSelectedPlanId] = useState<number>();
  const { data: travelPlans = [] } = useGetTravelPlan();
  const { data: expenses, refetch } = useGetExpenseByTravelPlan(selectedPlanId!);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "warning";
      case "Verified":
        return "success";
      case "Rejected":
        return "failure";
    }
  };
  const verifyExpenseMutation = useVerifyTravelExpense();
  const selectedPlan = travelPlans.find((tp) => tp.travelPlanId == selectedPlanId);
  const [selectedExpense, setSelectedExpense] = useState<TravelExpenseResponseType>();
  const { data: bill, refetch: refetch2 } = useGetDocumentByUrl(selectedExpense?.proofUrl!);

  useEffect(() => {
    console.log('commint')
    if (bill)
      window.open(URL.createObjectURL(bill!), '_blank');
  }, [bill])

  return (
    <>
      <SelectOption
        title='TravelPlan For Expense'
        value={selectedPlanId!}
        onChange={(value) => setSelectedPlanId(Number(value))}
        options={travelPlans.map(
          (tp) => ({ label: tp.title, value: tp.travelPlanId })
        )}
        placeholder='Select Plan'
      />

      {selectedPlanId &&
        <Card>
          <Table>
            <TableHead>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Detail</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Type</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>

            <TableBody>
              {expenses?.map((expense) => (
                <TableRow key={expense.employeeTravelExpenseId} className="bg-white">
                  <TableCell>
                    {selectedPlan?.travelEmployees.find((te) => te.employeeId = expense.travelEmployeeEmployeeId)?.firstName} {''}
                    {selectedPlan?.travelEmployees.find((te) => te.employeeId = expense.travelEmployeeEmployeeId)?.lastName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {expense.expenseDetail}
                  </TableCell>
                  <TableCell>
                    {new Date(expense.expenseDate).toLocaleDateString('en-GB')}
                  </TableCell>
                  <TableCell>
                    {expense.travelExpenseType.travelExpenseTypeName}
                  </TableCell>
                  <TableCell>
                    ₹{expense.amount}
                  </TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(expense.status)}>{expense.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {expense.status === "Submitted" && (
                        <>
                          <Button size="xs" color='green' onClick={() => {
                            verifyExpenseMutation.mutate({ expenseId: expense.employeeTravelExpenseId, status: 'Approved' }, {
                              onSuccess: (data) => { toast.success(data.message); refetch() },
                              onError: (err) => console.log(err.message)
                            })
                          }}>Approve</Button>
                          <Button size="xs" color='red' onClick={() => {
                            verifyExpenseMutation.mutate({ expenseId: expense.employeeTravelExpenseId, status: 'Rejected' }, {
                              onSuccess: (data) => { toast.success(data.message); refetch() },
                            })
                          }}>Reject</Button>
                        </>
                      )}
                      <Button size="xs" color="gray" onClick={() => {
                        setSelectedExpense(expense);
                        refetch2();
                      }}>
                        <Eye size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      }
    </>
  )
}

export default ManageExpense