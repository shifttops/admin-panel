import { ticketTypesMapper } from "../helpers/mappers";
import { makeAutoObservable, observable, observe } from "mobx";
import { ToastsStore } from "react-toasts";
import { refreshToken } from "../helpers/AuthHelper";
import Api from "../api";

class TicketsStore {
  isAssigneeListFetching = false;

  isTicketsFetching = false;

  isTicketAddFetching = false;
  isTicketFetching = false;
  isTicketDeleteFetching = false;
  isTicketEditFetching = false;

  isFilesFetching = false;

  isCommentsFetching = false;
  isTicketCommentAddFetching = false;

  tickets = observable.box([]);
  ticketInfo = {};

  assigneeList = observable.box([]);

  constructor() {
    makeAutoObservable(this);
  }

  getAssigneeList = async () => {
    try {
      this.isAssigneeListFetching = true;
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/get_assignee_list/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        this.assigneeList.set(await resp.json());
      } else ToastsStore.error(resp.details, 3000, "toast");
      this.isAssigneeListFetching = false;
    } catch (e) {
      this.isAssigneeListFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getTickets = async ({
    limit,
    search = "",
    field = null,
    type = "none",
    offset = this.tickets.get().length,
    signal = null,
    setResCount,
  }) => {
    try {
      await refreshToken();
      this.isTicketsFetching = true;

      let url = `${process.env.REACT_APP_URL}/api/ticket/?limit=${limit}&offset=${offset}`;
      if (field && type !== "none") {
        url += `&filtered_by=${field}&type=${type}`;
      }
      if (search.length) {
        url += `&search=${search}`;
      }

      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        signal,
      });

      if (resp.status === 200) {
        const res = await resp.json();

        setResCount(res.count);

        if (res.count) {
          this.tickets.set(
            !offset ? [...res.results] : [...this.tickets.get, ...res.results]
          );
          console.log(this.tickets.get());
        } else ToastsStore.error("No tickets find", 3000, "toast");
      } else ToastsStore.error("Server error", 3000, "toast");

      this.isTicketsFetching = false;
    } catch (e) {
      this.isTicketsFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  addTicket = async ({ data }) => {
    try {
      this.isTicketAddFetching = true;

      await refreshToken();

      const body = new FormData();

      body.append("type", data.type);
      if (data.type === "OTHER_TYPE")
        body.append("other_type", data.other_type);

      body.append("priority", data.priority);

      data.stores.map((store) => body.append("stores", store));

      if (data.files && data.files.length) {
        data.files.map((file) => body.append("files", file));
      }

      body.append("description", data.description);

      body.append("assignee", data.assignee);

      body.append(
        "name",
        `#${data.stores} ${
          ticketTypesMapper.find((type) => type.name === data.type).visibleName
        }`
      );

      const resp = await fetch(`${process.env.REACT_APP_URL}/api/ticket/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
        body,
      });

      this.isTicketAddFetching = false;

      if (resp.status !== 201) ToastsStore.error(resp.detail, 3000, "toast");

      return { status: resp.status, id: { ...(await resp.json()) }.id };
    } catch (e) {
      this.isTicketAddFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getTicket = async ({ id }) => {
    try {
      this.isTicketFetching = true;
      await refreshToken();

      const resp = await fetch(
        `${process.env.REACT_APP_URL}/api/ticket/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${localStorage.getItem("access")}`,
          },
        }
      );

      if (resp.status === 200) {
        this.ticketInfo = { ...(await resp.json()) };
      } else ToastsStore.error((await resp.json()).detail, 3000, "toast");
      this.isTicketFetching = false;
    } catch (e) {
      this.isTicketFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  editTicket = async ({ data }) => {
    try {
      this.isTicketEditFetching = true;
      await refreshToken();

      const body = new FormData();

      body.append("type", data.type);
      if (data.type === "OTHER_TYPE") body.append("other_type", data.otherType);

      body.append("id", this.ticketInfo.id);
      body.append("priority", data.priority);
      body.append("status", data.status);

      data.stores.map((store) => body.append("stores", store));

      if (data.files && data.files.length)
        data.files.map((file) => body.append("files", file));

      body.append("description", data.description);
      body.append("assignee", data.assignee);
      body.append(
        "name",
        `[McD-${this.ticketInfo.id}] #${data.stores} ${
          ticketTypesMapper.find((type) => type.name === data.type).visibleName
        }`
      );

      const resp = await Api.put(`/ticket/${this.ticketInfo.id}/`, body, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 200) await this.getTicket({ id: this.ticketInfo.id });

      this.isTicketEditFetching = false;
    } catch (e) {
      this.isTicketEditFetching = false;
    }
  };

  deleteTicket = async ({ id }) => {
    try {
      this.isTicketDeleteFetching = true;
      await refreshToken();

      const { status } = await Api.delete(`/ticket/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      this.isTicketDeleteFetching = false;

      return status;
    } catch (e) {
      this.isTicketDeleteFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getTicketComments = async () => {
    try {
      this.isCommentsFetching = true;
      await refreshToken();

      const resp = await Api.get(`/ticket_comment/${this.ticketInfo.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 200)
        this.ticketInfo = {
          ...this.ticketInfo,
          ticket_comments: [...(await resp.data)],
        };
      else ToastsStore.error(resp.error, 3000, "toast");
      this.isCommentsFetching = false;
    } catch (e) {
      this.isCommentsFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  addTicketComment = async ({ message, files }) => {
    try {
      this.isTicketCommentAddFetching = true;
      await refreshToken();

      const body = new FormData();
      body.append("ticket", this.ticketInfo.id);
      body.append("message", message);
      if (files.length) files.map((file) => body.append("files", file));

      const resp = await Api.post("/ticket_comment/", body, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
          "Content-type": "application/json",
        },
      });

      if (resp.status === 201) {
        await Promise.all([
          this.getTicketComments(),
          files.length ? this.getTicketFiles() : null,
        ]);
      } else ToastsStore.error(resp.error, 3000, "toast");
      this.isTicketCommentAddFetching = false;
    } catch (e) {
      this.isTicketCommentAddFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  deleteTicketComment = async ({ comment_id }) => {
    try {
      this.isCommentsFetching = true;

      await refreshToken();

      const resp = await Api.delete(`/ticket_comment/${comment_id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 204) await this.getTicketComments();
      else ToastsStore.error(resp.error, 3000, "toast");
      this.isCommentsFetching = false;
    } catch (e) {
      this.isCommentsFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  editTicketComment = async ({ comment_id, message, files }) => {
    try {
      this.isCommentsFetching = true;

      await refreshToken();

      const body = new FormData();

      body.append("message", message);
      body.append("ticket", this.ticketInfo.id);
      if (files.length) files.map((file) => body.append("files", file));

      const resp = await Api.put(`/ticket_comment/${comment_id}/`, body, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 200) await this.getTicketComments();
      else ToastsStore.error(resp.error, 3000, "toast");
      this.isCommentsFetching = false;
    } catch (e) {
      this.isCommentsFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  getTicketFiles = async () => {
    try {
      this.isFilesFetching = true;
      await refreshToken();

      const resp = await Api.get(`/ticket_file/${this.ticketInfo.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 200) {
        this.ticketInfo = {
          ...this.ticketInfo,
          files: [...(await resp.data)],
        };
      } else ToastsStore.error(resp.error, 3000, "toast");
      this.isFilesFetching = false;
    } catch (e) {
      this.isFilesFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };

  deleteTicketFile = async ({ id }) => {
    try {
      this.isFilesFetching = true;
      await refreshToken();

      const resp = await Api.delete(`/ticket_file/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("access")}`,
        },
      });

      if (resp.status === 204)
        await Promise.all([this.getTicketFiles(), this.getTicketComments()]);
      else ToastsStore.error(resp.error, 3000, "toast");
      this.isFilesFetching = false;
    } catch (e) {
      this.isFilesFetching = false;
      ToastsStore.error(e.message, 3000, "toast");
    }
  };
}

export default new TicketsStore();
