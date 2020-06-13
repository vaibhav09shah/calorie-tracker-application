import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

export default function AlertDialog(props) {

  return (
    <div>
      <Dialog
        open={props.show}
        onClose={props.closeMsgDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                <Alert severity={props.severity}>{props.message}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeMsgDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={props.showLogin} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}