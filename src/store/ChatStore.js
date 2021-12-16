import { makeAutoObservable, observable } from "mobx";
import moment from "moment";

class ChatStore {
  chatData = observable.box([
    {
      type: "store",
      id: "50426",
      storeInfo: {
        region: "Landkreis Wolfenbüttel",
        location: "Gebrüder-Welger-Str. 3, 38304 Wolfenbüttel",
      },
      messagesData: [
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim",
          isReplied: false,
          isFavorite: false,
          date: moment("2013-02-08 09:30:26.123+07:00"),
          type: "incoming",
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim",
          isReplied: false,
          isFavorite: false,
          date: moment(),
          type: "outgoing",
        },
      ],
    },
    {
      type: "store",
      id: "20928",
      storeInfo: {
        region: "Maramureș",
        location: "Mühlweg 2, 96465 Neustadt",
      },
      messagesData: [
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim",
          isReplied: false,
          isFavorite: false,
          date: moment(),
        },
      ],
    },
  ]);

  constructor() {
    makeAutoObservable(this);
  }
}

export default new ChatStore();
