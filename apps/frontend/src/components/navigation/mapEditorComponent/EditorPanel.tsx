import {SRQDropdown} from "@/components/serviceRequest/inputFields/SRQDropdown.tsx";
import {NodeType, Node} from "@/components/navigation/pathfinding/Graph.ts";

export interface EditorPanelProps {
    selectedNode: Node | null;
    currentNodeType: string;
    handleNodeTypeChange: (nodeType: string) => void;

    handleSubmit: () => void | Promise<void>;

    // Edge Handler
    edgeMode: boolean;
    setEdgeMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEdges: React.Dispatch<React.SetStateAction<boolean>>;

}

export const EditorPanel: React.FC<EditorPanelProps> = ({
                                                            selectedNode,
                                                            currentNodeType,
                                                            handleSubmit,
                                                            edgeMode,
                                                            setEdgeMode,
                                                            setShowEdges,
                                                            handleNodeTypeChange,

                                                        }) => {
    return (
            <div className="flex flex-col space-y-3 w-[85%] mx-auto">
                {selectedNode ? (
                    <div className=" bg-white shadow-lg border-2 pb-5 border-frey rounded-2xl m-3 font-[poppins] text-center space-y-3 ">

                        <h2 className="text-xl font-bold text-white p-5  rounded-t-lg border-b-5 bg-[#003a96] border-b-[#44A6A6] ">Node Info</h2>
                        <p className="text-black pt-2 text-lg">
                            <span className="font-semibold text-[#003a96]">ID:</span> {selectedNode.id}
                        </p>
                        <p className="text-black text-lg">
                            <span className="font-semibold text-[#003a96]">Name:</span> {selectedNode.name}
                        </p>
                        <p className="text-black text-lg">
                            <span className="font-semibold text-[#003a96]">lat :</span> {selectedNode.x.toFixed(6)}
                        </p>
                        <p className="text-black text-lg">
                            <span className="font-semibold text-[#003a96]">long :</span> {selectedNode.y.toFixed(6)}
                        </p>

                        <p className="text-black text-lg">
                            <span className="font-semibold text-[#003a96]">Type:</span> {selectedNode.type}
                        </p>
                        <hr className={'mx-5 my-5 border-black'}/>

                        <div className={'mx-4 my-4'}>
                            <SRQDropdown
                                value={currentNodeType}
                                setValue={handleNodeTypeChange}
                                width={'w-full'}
                                placeholder={'Select a node type'}
                                options={Object.values(NodeType) as string[]}
                            />
                        </div>
                    </div>
                ) : (
                    <div className=" bg-white shadow-lg border-2 pb-5 border-frey rounded-2xl m-3  font-[poppins] text-center space-y-3 ">

                        <h2 className="text-xl font-bold text-white p-5 rounded-t-lg bg-[#003a96] border-b-5 border-b-[#44A6A6] ">Node Info</h2>
                        <p className="text-black text-lg p-2">
                            <span className="font-semibold text-[#003a96]">ID:</span> Select a Node
                        </p>
                        <p className="text-black text-lg p-2">
                            <span className="font-semibold text-[#003a96]">Name:</span> Select a Node
                        </p>
                        <p className="text-black text-lg p-2">
                            <span className="font-semibold text-[#003a96]">Type:</span> Select a Node
                        </p>
                    </div>
                )}

                {/*<div className="w-full p-5 flex flex-col gap-4">*/}
                {/*    <ImportAllNodesAndEdges />*/}
                {/*</div>*/}

                <button
                    className="bg-[#003a96] w-[95%] flex items-center justify-center mt-3 mx-auto text-white border-2 border-[#003a96] font-[poppins] hover:bg-blue-950 shadow-lg text-[13pt] rounded-xl p-3"
                    onClick={() => {
                        setEdgeMode((prevState) => !prevState);
                        setShowEdges(true);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6L6 18" />
                        <circle cx="18" cy="6" r="2" />
                        <circle cx="6" cy="18" r="2" />
                    </svg>
                    {edgeMode ? 'Exit Edge Mode' : 'Add Edge Mode'}
                </button>

                <button
                    className={
                        'bg-white  text-[#003a96] w-[95%] mt-3 block mx-auto font-[poppins] border-2 border-[#003a96] hover:bg-accent shadow-lg rounded-xl p-3 '
                    }
                    type={'submit'}
                    onClick={handleSubmit}
                >
                    Submit Changes
                </button>
            </div>
    );
};