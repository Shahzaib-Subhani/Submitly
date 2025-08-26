
import AppSideBar from './appSideBar';
import AppHeader from './AppHeader';

const MainPage = () => {
    return (
        <>
            <div className="flex h-screen">
                <AppSideBar />

                <div className="flex flex-col flex-1">
                    <AppHeader  />
                    <main className="flex-1 p-6 bg-white">
                        <h1 className="text-2xl font-bold">Dashboard Content</h1>
                    </main>

                </div>
            </div>
        </>
    );
}

export default MainPage;
