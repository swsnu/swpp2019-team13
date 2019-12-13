from locust import HttpLocust, TaskSet, task, between


class LoadTask(TaskSet):
    def on_start(self):
        pass

    def on_stop(self):
        pass

    # @task
    # def load_additional_info(self):
    #     self.client.get("/api/category/list/")
    #     self.client.get("/api/tag/list/")
    #     self.client.get("/api/dept/list/")
    #     self.client.get("/api/major/list/")

    # @task
    # def club_list(self):
    #     self.client.get("/api/club/list/")

    # @task
    # def somoim_list(self):
    #     self.client.get("/api/somoim/list/")

    @task
    def club_list(self):
        self.client.get("/api/club/9/")


# locust -f load_test.py --host='http://52.141.23.207:8000'
class WebSiteUser(HttpLocust):
    task_set = LoadTask
    wait_time = between(1, 5)
