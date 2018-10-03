import React from "react";

const Modal = ({ children, closeModal, modalState, title }) => {
  if (!modalState) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"> {title} </p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content"> {children} </div>
        </section>
        <footer className="modal-card-foot">
          <a className="button" onClick={closeModal}>
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       modalState: false
//     };

//     this.toggleModal = this.toggleModal.bind(this);
//   }

//   toggleModal() {
//     this.setState((prev, props) => {
//       const newState = !prev.modalState;

//       return {
//         modalState: newState
//       };
//     });
//   }

//   render() {
//     return (
//       <section className="section">
//         <div className="container">
//           <div className="has-text-centered content">
//             <h1 className="title"> React + Bulma modal example </h1> <hr />
//             <a className="button is-primary" onClick={this.toggleModal}>
//               Open Modal{" "}
//             </a>{" "}
//           </div>
//           <Modal
//             closeModal={this.toggleModal}
//             modalState={this.state.modalState}
//             title="Example modal title"
//           >
//             <p>
//               {" "}
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.Maecenas
//               sit amet justo in arcu efficitur malesuada nec ut diam.Aenean a
//               iaculis eros.Proin nec purus congue, rutrum sapien id, sodales
//               ante.Nam imperdiet sapien pretium leo dapibus euismod.Ut ac
//               venenatis nunc.Praesent viverra purus vel lacus ullamcorper porta
//               a a augue.Proin rhoncus tempus leo sed ultricies.In luctus aliquam
//               placerat.Cras efficitur enim vitae vulputate consequat.Nulla
//               tellus est, fringilla quis nisi eu, aliquam finibus eros.{" "}
//             </p>{" "}
//             <p>
//               {" "}
//               Aliquam est dui, varius eu tempor ac, ornare vel magna.Suspendisse
//               potenti.Nullam gravida fermentum turpis, at ultricies risus
//               bibendum sit amet.Nulla et arcu id nisi semper ullamcorper cursus
//               sed magna.Phasellus pulvinar ligula vehicula consequat
//               sagittis.Donec tristique tellus sed ex euismod ullamcorper.Vivamus
//               nibh metus, scelerisque sed lorem eget, auctor lobortis
//               sapien.Pellentesque habitant morbi tristique senectus et netus et
//               malesuada fames ac turpis egestas.Proin congue auctor diam,
//               efficitur dignissim neque.Pellentesque vitae odio ut odio auctor
//               feugiat.Curabitur eget mauris nibh.Vestibulum massa nunc, iaculis
//               at purus venenatis, mollis tincidunt tortor.{" "}
//             </p>{" "}
//           </Modal>{" "}
//         </div>{" "}
//       </section>
//     );
//   }
// }
