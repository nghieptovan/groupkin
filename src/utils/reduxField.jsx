import React from 'react';

const renderField = ({
  input,
  label,
  type,
  classgroup,
  classlable,
  classinput,
  readonly,
  meta: { touched, error, warning }
}) => (
  <div className={(error && touched) ? `${classgroup} fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid`:  `${classgroup}`}>
      <label className={`${classlable}`}>{label}</label>
      <input className={(error && touched) ? `${classinput} is-invalid` : `${classinput}`} type={type} readOnly={readonly} {...input} />
      {touched &&
          ((error && <div className="fv-plugins-message-container invalid-feedback">
            <div data-field="email" data-validator="notEmpty">{error}</div> 
            </div>) || (warning && <span>{warning}</span>))    }
  </div>

  );

const renderFormField = ({
  input,
  label,
  type,
  classgroup,
  classinput,
  idinput,
  readonly,
  meta: { touched, error, warning },
  maxLength
}) => (
    <div className={classgroup}>
      <label htmlFor={idinput}>{label}</label>
      <input readOnly={readonly} type={type} className={(error && touched) ? `${classinput} is-invalid` : `${classinput}`} id={idinput} placeholder={label} maxLength={maxLength} {...input} />
      {touched &&
        ((error && <span id={idinput} className="error invalid-feedback">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );


const renderFormFieldAppend = ({
  input,
  label,
  type,
  disabled,
  classinput,
  classappend,
  idinput,
  meta: { touched, error, warning }
}) =>{
  console.log(touched);
  console.log(warning);
  console.log(error);
  return (
    <div>
      <label htmlFor={idinput}>{label}</label>
      <div className="input-group">
        <input autoComplete="bvxhewtfdg" disabled={disabled || false} type={type} className={(touched && error) ? 'form-control is-invalid' : 'form-control'} id={idinput} placeholder={label}  {...input} />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className={classappend}></span>
          </div>
        </div>
        {touched &&
          ((error && <span className="error invalid-feedback">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
} ;



const renderTextAreaField = ({
  input,
  label,
  type,
  classgroup,
  classinput,
  idinput,
  readonly,
  meta: { touched, error, warning },
  maxLength,
  onKeyUp
}, props) => (
    <div className="form-group">
      <label>{label}</label>
      <textarea readOnly={readonly} className="form-control" rows="3" maxLength={maxLength} placeholder={label} {...input} onKeyUp={onKeyUp}></textarea>
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
const renderRadioField = ({
  input,
  label,
  type,
  classgroup,
  classinput,
  idinput,
  meta: { touched, error, warning }
}) => (
    <div className="form-group">
      <label>{label}</label>
      <textarea className="form-control" rows="3" placeholder={label} {...input}></textarea>
    </div>
  );
export {
  renderField,
  renderFormField,
  renderTextAreaField,
  renderRadioField,
  renderFormFieldAppend
}

