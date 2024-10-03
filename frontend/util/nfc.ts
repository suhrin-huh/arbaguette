import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';

export type State = 'ready' | 'processing' | 'finish';

async function* writeNfcData(data: string): AsyncGenerator<State> {
  const encodedData = Ndef.encodeMessage([Ndef.textRecord(data)]);
  try {
    console.log('NFC 시작');
    await NfcManager.start();
    yield 'ready';

    await NfcManager.requestTechnology(NfcTech.Ndef, { alertMessage: 'NFC 카드를 스마트폰 후면에 대주세요.' });
    console.log('NFC 카드를 인식했습니다.');
    yield 'processing';

    if (encodedData) {
      await NfcManager.ndefHandler.writeNdefMessage(encodedData);
      console.log('NFC 카드에 데이터를 썼습니다.');
    }

    await NfcManager.cancelTechnologyRequest();
    yield 'finish';
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
}

async function* readNfcData() {
  try {
    console.log('NFC 시작');
    await NfcManager.start();
    yield 'ready';

    await NfcManager.requestTechnology(NfcTech.Ndef, { alertMessage: 'NFC 카드를 스마트폰 후면에 대주세요.' });
    console.log('NFC 카드를 인식했습니다.');
    yield 'processing';

    const tag = await NfcManager.getTag();

    await NfcManager.cancelTechnologyRequest();
    yield tag;
  } finally {
    await NfcManager.cancelTechnologyRequest();
  }
}

export { readNfcData, writeNfcData };
