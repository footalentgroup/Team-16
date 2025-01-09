import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../features/ui/uiSlice';

const ErrorMessage = () => {
  const errorMessage = useSelector((state) => state.ui.errorMessage);
  const dispatch = useDispatch();

  if (!errorMessage) return null;

  return (
    <div className="error-message">
      <p>{errorMessage}</p>
      <button onClick={() => dispatch(clearError())}>Cerrar</button>
    </div>
  );
};

export default ErrorMessage;
