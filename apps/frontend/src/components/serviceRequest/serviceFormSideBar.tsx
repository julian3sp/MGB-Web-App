import RequestButton from "./formTypeButton.tsx";
import TextInput from "../TextInput.tsx";
import React, { useState } from 'react';
import SideNav from "../serviceRequest/sideNavigation.tsx"
import accImage from './images/user.png'

function ServiceFormSideBar() {
    const [searchData, setSearch] = useState('')
    const handleFormRequest = (form: string) => {
        console.log(form + "requested");
    };

    return (
        <>
            <SideNav>
                <h2 className="text-gray-800 text-lg mb-4">Mass General</h2>
                <div className="flex flex-wrap items-center justify-center">
                    <img
                        src={accImage}
                        alt="user"
                        width="50"
                        height="50"
                        className={"mr-1"}
                    />
                    <h2 className={'text-gray-700 font-bold text-2xl'}> Account</h2>
                </div>

                <div className="w-full">
                    <div className="text-gray-700 font-semibold mb-2">Menu</div>


                    <div className="p-2 bg-gray-300 rounded">
                        <div className="text-gray-700 flex justify-between  py-2">
                            <TextInput
                                label={'Search Form:'}
                                placeholder={'Search Form ...'}
                                value={searchData}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <RequestButton
                            label={'Language Interpreter Service Form'}
                            onClick={() => handleFormRequest('Language Interpreter Service Form')}
                        />
                        <RequestButton
                            label={'Medical Device Form'}
                            onClick={() => handleFormRequest('Medical Device Form')}
                        />
                        <RequestButton
                            label={'Service Request Form'}
                            onClick={() => handleFormRequest('Service Request Form')}
                        />
                    </div>

                </div>
            </SideNav>
        </>
    );
}
export default ServiceFormSideBar;



