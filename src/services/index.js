const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const admin = require('firebase-admin');
admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const { amount, roomId, checkIn, checkOut } = data;

    const roomRef = admin.firestore().collection('rooms').doc(roomId);
    const roomDoc = await roomRef.get();
    
    if (!roomDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Room not found');
    }

    const bookingsSnapshot = await admin.firestore().collection('bookings')
      .where('roomId', '==', roomId)
      .where('checkIn', '<=', checkOut)
      .where('checkOut', '>=', checkIn)
      .get();

    if (!bookingsSnapshot.empty) {
      throw new functions.https.HttpsError('failed-precondition', 'Room is not available for selected dates');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'zar',
      metadata: {
        roomId,
        checkIn,
        checkOut
      }
    });

    return {
      clientSecret: paymentIntent.client_secret
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});