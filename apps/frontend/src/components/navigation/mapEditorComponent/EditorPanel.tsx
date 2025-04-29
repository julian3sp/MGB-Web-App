import {SRQDropdown} from "@/components/serviceRequest/inputFields/SRQDropdown.tsx";
import {NodeType} from "@/components/navigation/pathfinding/Graph.ts";
import ImportAllNodesAndEdges from "@/components/navigation/mapEditorComponent/Import.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

export interface EditorPanelProps {
    selectedNode: Node | null;

    currentNodeType: string;
    setCurrentNodeType: React.Dispatch<React.SetStateAction<string>>;

    handleSubmit: () => void | Promise<void>;

    // Edge Handler
    edgeMode: boolean;
    setEdgeMode: React.Dispatch<React.SetStateAction<boolean>>;
    setShowEdges: React.Dispatch<React.SetStateAction<boolean>>;

    // Algo Type
    algoType: string;
    setAlgoTypeWrapper: (algo: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
                                                            selectedNode,
                                                            currentNodeType,
                                                            setCurrentNodeType,
                                                            handleSubmit,
                                                            edgeMode,
                                                            setEdgeMode,
                                                            setShowEdges,
                                                            algoType,
                                                            setAlgoTypeWrapper,
                                                        }) => {
    return (
        <div>
            <h2 className="font-bold text-center font-[poppins]">Map Editor Controls</h2>

            {selectedNode && (
                <div className="bg-white shadow-lg border-2 border-frey rounded-2xl p-6 font-[poppins] text-center space-y-3">

                    <h2 className="text-xl font-semibold text-gray-800">Node Info</h2>
                    <p className="text-black text-lg">
                        <span className="font-bold">ID:</span> {selectedNode.id}
                    </p>
                    <p className="text-black text-lg">
                        <span className="font-bold">Name:</span> {selectedNode.name}
                    </p>
                    <p className="text-black text-lg">
                        <span className="font-bold">Type:</span> {selectedNode.type}
                    </p>
                    <SRQDropdown
                        value={currentNodeType}
                        setValue={setCurrentNodeType}
                        width="w-full"
                        placeholder="Select a node type"
                        options={Object.values(NodeType) as string[]}
                    />
                </div>
            )}

            <div className="w-full p-5 flex flex-col items-center gap-4">
                <div className="w-full">
                    <ImportAllNodesAndEdges />
                </div>

                <button
                    className="bg-[#003a96] w-4/5 text-white font-[poppins] hover:bg-blue-950 shadow-lg rounded p-3"
                    onClick={handleSubmit}
                >
                    Submit Changes
                </button>

                <button
                    className="bg-[#003a96] w-4/5 text-white font-[poppins] hover:bg-blue-600 shadow-lg rounded p-3"
                    onClick={() => {
                        setEdgeMode((prev) => !prev);
                        setShowEdges(true);
                    }}
                >
                    {edgeMode ? "Exit Edge Mode" : "Add Edge Mode"}
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="bg-[#003a96] w-4/5 text-white font-[poppins] hover:bg-blue-950 shadow-lg rounded p-3">
                            Choose Your Algorithm
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {/* … */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};