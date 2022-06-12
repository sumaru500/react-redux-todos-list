import React from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import TodoList from '~/containers/TodoList';
function App() {
    return (
        <React.Fragment>
            <section className="todoapp">
                <Header></Header>
                {/* <!-- This section should be hidden by default and shown when there are todos --> */}
                <section className="main">
                    <TodoList></TodoList>
                </section>
                {/* <!-- This footer should hidden by default and shown when there are todos --> */}
                <Footer></Footer>
            </section>
        </React.Fragment>
    );
}

export default App;
