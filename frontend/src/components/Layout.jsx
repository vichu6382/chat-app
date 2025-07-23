import styled from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, showSidebar = false }) => {
    return (
        <Layoutstyle>
            <div className="min-vh-100 bg-dark">
                <div className="d-flex flex-row" style={{ minHeight: "100vh" }}>
                    {showSidebar && <Sidebar />}
                    <div className="flex-grow-1 d-flex flex-column">
                        <Navbar />
                        <main className="flex-grow-1 overflow-auto p-3">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </Layoutstyle>
    );
}

const Layoutstyle = styled.div`
  background: #1e1e1e;
  min-height: 100vh;
  .bg-dark {
    background: #1e1e1e !important;
  }
  .d-flex {
    display: flex !important;
  }
  .flex-row {
    flex-direction: row !important;
  }
  .flex-column {
    flex-direction: column !important;
  }
  .flex-grow-1 {
    flex-grow: 1 !important;
  }
  .overflow-auto {
    overflow: auto !important;
  }
  @media (max-width: 768px) {
    .p-3 {
      padding: 1rem !important;
    }
  }
`;

export default Layout