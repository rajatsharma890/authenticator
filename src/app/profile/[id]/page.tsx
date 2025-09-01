export default async function UserProfile({params}: any) {
    const user = await params.id
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white font-serif p-4">
            
            <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl border border-gray-700 p-8 space-y-6 text-center">
                
                <h1 className="text-4xl font-light text-gray-100 mb-2 tracking-wide">
                    User Profile
                </h1>
                
                <hr className="border-t border-gray-700 mx-auto w-24 opacity-70" />
                
                <p className="text-xl text-gray-400 mt-6">
                    Viewing details for:
                </p>
                
                <div className="bg-gray-800 border border-gray-600 p-6 rounded-md font-mono text-3xl md:text-5xl font-extralight text-teal-400 break-all leading-tight shadow-inner shadow-gray-700/30">
                    {user}
                </div>
                
            </div>
            
        </div>
    )
}