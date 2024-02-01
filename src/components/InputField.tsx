import Form from 'react-bootstrap/Form';


interface InputProps {
    id: string,
    type: 'text' | 'number' | 'email' | 'password' | 'date'
    label: string
    value?: string | number
    name: string
    placeholder: string
    error: string,
    fieldRef: any,
    // disabled?: boolean
    // onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onChange: any
  }

export default function InputField(
    {id, name, label, type, placeholder, error, value, fieldRef, onChange}:InputProps
  
): JSX.Element {

  id = id || name;

  return (
    <Form.Group controlId={name} className="InputField">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        // id={id}
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldRef}
        value={value}
        onChange={onChange}

      />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}