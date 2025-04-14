import { NavLink, Outlet, redirect, useNavigate } from 'react-router-dom';
import RequestTablePage from './RequestTablePage.tsx';
import RequestListPage from './RequestListPage.tsx';
import { useState } from 'react';
import { Switch } from '../../components/ui/switch.tsx';

export default function RequestPage() {
    const [isActive, setActive] = useState(true);
    const toggleActive = () => setActive(!isActive);
    const navigate = useNavigate();

    return (
        <div
            className="border min-h-[85vh] bg-white mr-25 ml-25 font-[Poppins] py-4"
            style={{ borderColor: '#005E64', borderWidth: '4px', borderStyle: 'solid' }}
        >
            <div className="flex gap-4 justify-end p-4 items-center">
                <h1
                    className="text-3xl font-bold font-[Poppins] w-full text-left"
                    style={{ color: '#003A96' }}
                >
                    Service Requests:
                </h1>
                <div className="flex flex-col items-end">
                <Switch
                    defaultChecked={!isActive}
                    onCheckedChange={() => {
                        toggleActive();
                        if (!isActive) {
                            navigate('table');
                        } else {
                            navigate('list');
                        }
                    }}
                    className="mx-auto"
                    style={{backgroundColor: isActive? '' : '#003A96'}}
                />
                <div>
                    <p className="whitespace-nowrap text-sm font-[Poppins] py-1">Switch view</p>                </div>
                </div>
            </div>
            <div className="py-1">
                <Outlet />
            </div>
        </div>
    );
}
