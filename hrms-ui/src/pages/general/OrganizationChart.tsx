import React, { useMemo, useState } from 'react'
import { useGetEmployees, useGetOrgChartByEmployee } from '../../query/EmployeeQuery'
import { useSelector } from 'react-redux';
import type { RootStateType } from '../../redux-store/Store';
import { Button, Card, Dropdown, DropdownItem, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'flowbite-react';
import type { EmployeeDetailType } from '../../types/CommonType';
import { Tree, TreeNode } from 'react-organizational-chart'
import SearchableDropdown from '../../common/SearchableDD';

function ChartNode({ employeeId, detail, setSelectNode }: { employeeId: number, detail: EmployeeDetailType, setSelectNode: Function }) {
    return (
        <Card className={`w-30 inline-block ${employeeId == detail?.employeeId && 'bg-blue-300'}`}
            onClick={() => setSelectNode(detail)}>
            {detail?.firstName + " " + detail?.lastName}
        </Card>
    );
}

function OrganizationChart() {
    const user = useSelector((state: RootStateType) => state.user);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(user.userId);
    const { data, isLoading } = useGetOrgChartByEmployee(selectedEmployeeId);
    const [selectNode, setSelectNode] = useState<EmployeeDetailType>();
    const { data: employees } = useGetEmployees();
    const makeTree = (emp: EmployeeDetailType) => (
        <TreeNode key={emp.employeeId} label={<ChartNode employeeId={selectedEmployeeId} detail={emp} setSelectNode={setSelectNode} />}>
            {emp.childEmployee && emp.childEmployee.map(makeTree)}
        </TreeNode>
    )

    return (
        <>
            <div className='flex gap-6 mb-5'>
                <h1 className="text-3xl font-bold text-gray-500">Organization Chart</h1>

                <div className='ml-auto'>
                    <SearchableDropdown
                        label='Select Employee'
                        items={employees!}
                        getKey={(item) => item.employeeId}
                        getLabel={(item) => item.firstName + ' ' + item.lastName}
                        onSelect={(item) => setSelectedEmployeeId(item.employeeId)}
                    />
                </div>
            </div>

            <div className='justify-items-center'>
                {isLoading ? <div className='flex items-center justify-center'><Spinner/></div> :
                    <Tree label={<ChartNode employeeId={selectedEmployeeId} detail={data!} setSelectNode={setSelectNode} />}>
                        {data?.childEmployee && data.childEmployee.map(makeTree)}
                    </Tree>
                }
            </div>

            <Modal show={selectNode != undefined}>
                <ModalHeader>{selectNode?.firstName + " " + selectNode?.lastName} - {selectNode?.roleName}</ModalHeader>
                <ModalBody>
                    <p>
                        <strong>Department:</strong>{" "}
                        {selectNode?.departmentName}
                    </p>
                    <p>
                        <strong>Joining Date:</strong>{" "}
                        {new Date(selectNode?.joiningDate!).toLocaleDateString('en-GB')}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {selectNode?.email}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => setSelectNode(undefined)}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default OrganizationChart