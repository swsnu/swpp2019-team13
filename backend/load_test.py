from locust import HttpLocust, TaskSet, task, between


class LoadTask(TaskSet):
    def on_start(self):
        pass

    def on_stop(self):
        pass

    @task
    def club_list(self):
        self.client.get("/api/club/list/")


class WebSiteUser(HttpLocust):
    task_set = LoadTask
    wait_time = between(1, 5)
