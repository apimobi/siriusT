import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { useFlash } from '../contexts/FlashProvider';


export default function FlashMessage() {

  const useFlashContext = useFlash();

  return (
    <Collapse in={useFlashContext.visible}>
      <div>
        <Alert variant={useFlashContext.flashMessage.type || 'info'} dismissible
          onClose={useFlashContext.hideFlash}>
          {useFlashContext.flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  );
}