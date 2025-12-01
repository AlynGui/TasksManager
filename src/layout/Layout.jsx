import Header from '../components/Header';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
            <Header />
            {children}
        </div>
    );
}