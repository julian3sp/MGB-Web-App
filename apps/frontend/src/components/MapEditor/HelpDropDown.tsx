import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "./DropdownMenu.tsx"
import { CircleHelp } from "lucide-react"

const HelpDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")

  const handleItemClick = (instruction: string) => {
    setModalContent(instruction)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="absolute bottom-24 right-1 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-[#003a96] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-950 cursor-pointer">
              <CircleHelp className="w-6 h-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="font-bold">Help & Instructions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleItemClick("To import nodes, double left click on the screen.")}>
              How to import nodes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick("Select a destination in the bottom bar to see the overlay.")}>
              How to toggle overlays
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick("Double right-click on the node and it will turn red.")}>
              How to remove a node
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleItemClick("Click 'Submit' in the side bar.")}>
              Submit changes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Instruction</h2>
            <p className="mb-6">{modalContent}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-[#003a96] text-white py-2 rounded-lg hover:bg-blue-950"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default HelpDropdown
