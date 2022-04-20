//Error component
const Error = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h4 className="text-danger mb-0">404</h4>
      <p className="text-dark fw-bold">
        <small>Page Not Found!</small>
      </p>
    </div>
  );
};

export default Error;
