package natsadapter

// type adapter struct {
//	conn *nats.Conn
//}
//
// func NewAdapter(conn *nats.Conn) *adapter {
//	return &adapter{
//		conn: conn,
//	}
//}
//
// func (a *adapter) SubscribeChan(subj string, c chan<- []byte) (mq.Subscription, error) {
//	ec, err := nats.NewEncodedConn(a.conn, nats.DEFAULT_ENCODER)
//	if err != nil {
//		return nil, errors.Wrap(err, "SubscribeChan: nats.NewEncodedConn")
//	}
//
//	sub, err := ec.BindRecvChan(subj, c)
//	if err != nil {
//		return nil, errors.Wrap(err, "SubscribeChan: ec.BindRecvChan")
//	}
//
//	return sub, nil
//}
//
// func (a *adapter) Publish(subj string, data []byte) error {
//	if err := a.conn.Publish(subj, data); err != nil {
//		return errors.Wrap(err, "Publish: a.conn.Publish")
//	}
//
//	return nil
//}
//
// func (a *adapter) Request(subj string, data []byte, t time.Duration) ([]byte, error) {
//	msg, err := a.conn.Request(subj, data, t)
//	if err != nil {
//		return nil, errors.Wrap(err, "Request: a.conn.Request(subj, data, t)")
//	}
//
//	return msg.File, nil
//}
