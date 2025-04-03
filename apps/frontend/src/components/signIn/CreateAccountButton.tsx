import React from 'react';

export function CreateAccountButton({ setHasAccount, caption, linkName }: { setHasAccount: (value: boolean) => void, caption: string, linkName: string }){
    return (
        <>
            <div>
                <p className="pt-[25px] text-center text-[16px] font-[Poppins] text-[#98a2b3]">
                    {caption}

                    <button
                        className="pl-[10px] text-[16px] text-[#1570ef] underline"
                        onClick={() => setHasAccount(false)}
                    >
                        {linkName}
                    </button>
                </p>
            </div>
        </>
        // med from sheet - d9d9d9
        // edited style - 98a2b3
    );
}