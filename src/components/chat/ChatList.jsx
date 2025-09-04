import React from 'react';
import ChatProfile from './ChatProfile';

const ChatList = () => {
    return (
        <div className="flex-col rounded-2xl border border-gray-200 bg-white xl:flex xl:w-1/4">
            <div className="sticky px-4 pt-4 pb-4 sm:px-5 sm:pt-5 xl:pb-0">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-theme-xl sm:text-2xl">Chats</h3>
                    </div>

                </div>

                <div className="flex items-center gap-3 mt-4">
                    <button className="flex items-center justify-center w-full text-gray-700 border border-gray-300 rounded-lg h-11 max-w-11 xl:hidden">
                        <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L20 12.75C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25L4 11.25Z"
                                fill=""
                            />
                        </svg>
                    </button>


                </div>
            </div>

            <div className="flex-col overflow-auto no-scrollbar transition-all duration-300 hidden xl:flex">
                <div className="flex items-center justify-between p-5 border-b border-gray-200 xl:hidden">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-theme-xl sm:text-2xl">Chat</h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="relative inline-block">
                            <button>
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-400 hover:text-gray-700 size-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>

                        <button className="flex items-center justify-center w-10 h-10 text-gray-700 transition border border-gray-300 rounded-full">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col max-h-full px-4 overflow-auto sm:px-5">
                    <div className="max-h-full space-y-1 overflow-auto custom-scrollbar">
                        {/* Example of one chat item, repeat as needed */}
                       

                          <ChatProfile name={"Team No. 1"} lastMessage={"3:35 PM"} role={"Team"}  />
                          <ChatProfile name={"Evaluator No. 1"} lastMessage={"3:35 PM"} role={"Evaluator"}  />
                        
                        {/* Repeat for other chat items as in your original code */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatList;
