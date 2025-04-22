import React from 'react';
import { NavLink } from 'react-router-dom';
import DepartmentList from '../../components/DepartmentList.ts';
import DepartmentRoutes from './DepartmentRoutes.tsx';
import { trpc } from '../../lib/trpc.ts';
import PageWrapper from '@/components/ui/PageWrapper.tsx';

const DepartmentDirectory = () => {
    const Directories = trpc.getDirectories.useQuery();
    return (
        <div className="min-h-screen font-[Poppins] pt-4">
            <div className="flex gap-4 justify-between px-[16px] pb-2 pt-1 items-end h-[59.5px]"> {/*59.5px to match height of service request view page (filter icon makes it bigger)*/}
                <h1
                    className="text-4xl font-bold font-[Poppins] text-left"
                    style={{ color: '#003A96' }}
                >
                    Department Directory:
                </h1>
            </div>
            <div className="pt-1">
                <PageWrapper
                    open={true}
                    contents={
                        <nav
                            className="w-full h-full bg-white p-6 overflow-hidden"
                            style={{
                                borderTop: '2px solid #d9d9d9',
                                borderBottom: 'none',
                                borderRight: '2px solid #d9d9d9',
                                borderLeft: 'none',
                            }}
                        >
                            {/*Border styling*/}
                            <h3
                                className="text-2xl font-bold mb-4 font-[Poppins] text-center "
                                style={{ color: '#003A96' }}
                            >
                                Select a Department:
                            </h3>{' '}
                            {/*Header for list of departments on page*/}
                            {Directories.isLoading && <p>Loading...</p>}
                            {Directories.error && <p>Error loading directories.</p>}
                            <ul>
                                {/*key is used to track changes,
                     each department name can be clicked on to display information about the department (li and NavLink),
                     block p-2 ... userd to create a rounded rectangle around the departments. entire box is clickable
                     ` (grave key) is used to wrap the line mentioned above, not ' (single quote)
                     the current selected department will be highlighted
                     hovering a department will slightly change the shade of the box
                     "to" line sets the URL to the correct department
                     */}
                                {Directories.data?.map((dept) => (
                                    <li key={dept.id} className="mb-2 shadow-lg">
                                        <NavLink
                                            to={`/directory/${dept.id}`}
                                            className={
                                                ({ isActive }) =>
                                                `w-full text-left block p-5 border rounded ${isActive
                                                        ? 'border-2 text-blue-900 font-bold font-[Poppins]'
                                                        : 'text-gray-700 hover:bg-gray-100 font-[Poppins]'
                                                }` /* Put requests in rounded rectangle boxes*/
                                            }
                                            style={({ isActive }) => ({
                                                borderColor:
                                                    isActive
                                                        ? '#005E64'
                                                        : '#003A96',
                                                borderWidth: '1 px',
                                                borderStyle: 'solid',
                                            })}
                                        >
                                            {dept.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    }
                    scaling={3}
                >
                    <nav className="min-h-screen flex flex-1 font-[Poppins]">
                        <div
                            className="h-auto flex-1 bg-white p-6 pl-5"
                            style={{
                                borderTop: '2px solid #d9d9d9',
                                borderBottom: 'none',
                                borderRight: 'none',
                                borderLeft: 'none',
                            }}
                        >
                            <h3
                                className="text-2xl font-bold mb-4 font-[Poppins] text-center "
                                style={{ color: '#003A96' }}
                            >
                                Department Details:
                            </h3>
                            <nav
                            >
                                {' '}
                                {/*Border styling*/}
                                <DepartmentRoutes />
                            </nav>
                        </div>
                    </nav>
                </PageWrapper>
            </div>
        </div>
    );
};

export default DepartmentDirectory;
