import { refreshToken } from "../helpers/AuthHelper";
import { makeAutoObservable, observable } from "mobx";
import Api from "../api";
import { ToastsStore } from "react-toasts";

class UsersStore {
  isUsersFetching = false;
  isPermissionsFetching = false;
  isPermissionsSetFetching = false;

  users = observable.box([]);
  permissions = observable.box([]);

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    try {
      this.isUsersFetching = true;
      await refreshToken();

      const { data, status } = await Api.get(
        `${process.env.REACT_APP_URL}/api/get_users/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (status === 200) {
        this.users.set(data);
      } else ToastsStore.error(data.detail, 3000, "toast");

      this.isUsersFetching = false;
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
      this.isUsersFetching = false;
    }
  };

  getPermissions = async () => {
    try {
      this.isPermissionsFetching = true;
      await refreshToken();

      const { data, status } = await Api.get(
        `${process.env.REACT_APP_URL}/api/get_set_permissions/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (status === 200) {
        this.permissions.set(data);
      } else ToastsStore.error(data.detail, 3000, "toast");

      this.isPermissionsFetching = false;
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
      this.isPermissionsFetching = false;
    }
  };

  setPermissions = async ({ userId, action, permissionsIds }) => {
    try {
      this.isPermissionsSetFetching = true;
      await refreshToken();

      const { data, status } = await Api.post(
        `${process.env.REACT_APP_URL}/api/get_set_permissions/`,
        {
          permissions_pks: permissionsIds,
          action: action,
          user_pk: userId,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 200) {
        this.permissions.set(data);
        await this.getPermissions();
      } else ToastsStore.error(data.detail, 3000, "toast");

      this.isPermissionsSetFetching = false;
    } catch (e) {
      ToastsStore.error(e.message, 3000, "toast");
      this.isPermissionsSetFetching = false;
    }
  };
}

export default new UsersStore();
