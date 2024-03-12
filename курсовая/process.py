import operator
from enum import Enum
from dataclasses import dataclass, field
from typing import List, Any
from psutil import Process


class PrStatus(Enum):
    STATUS_RUNNING = 'running'
    STATUS_SLEEPING = 'sleeping'
    STATUS_DISK_SLEEP = 'disk-sleep'
    STATUS_STOPPED = 'stopped'
    STATUS_TRACING_STOP = 'tracing-stop'
    STATUS_ZOMBIE = 'zombie'
    STATUS_DEAD = 'dead'
    STATUS_WAKE_KILL = 'wake-kill'
    STATUS_WAKING = 'waking'
    STATUS_IDLE = 'idle'
    STATUS_LOCKED = 'locked'
    STATUS_WAITING = 'waiting'
    STATUS_SUSPENDED = 'suspended'
    STATUS_PARKED = 'parked'


class ProcField:
    def __init__(self, fname: str, value: Any):
        self.fname = fname
        self.value = value

    def get_name(self) -> str:
        return self.fname

    def get_value(self) -> Any:
        return self.value


@dataclass
class ProcInfo:
    proc: Process = field(repr=False)
    fields_array: List[ProcField] = field(default_factory=list)

    def __post_init__(self):
        self.fields_array.append(ProcField('pid', self.proc.pid))
        self.fields_array.append(ProcField('name', self.proc.name()))
        self.fields_array.append(ProcField('status', self.proc.status()))
        mem_info = self.proc.memory_info()
        self.fields_array.append(ProcField('wset', mem_info.wset))
        self.fields_array.append(ProcField('peak_wset', mem_info.peak_wset))
        self.fields_array.append(ProcField('pagefile', mem_info.pagefile))
        self.fields_array.append(ProcField('peak_pagefile', mem_info.peak_pagefile))

    def __getitem__(self, name: str) -> Any:
        for f in self.fields_array:
            if f.get_name() == name:
                return f.get_value()
        return None

    def __repr__(self) -> str:
        p_dict = {}
        for f in self.fields_array:
            p_dict[f.get_name()] = f.get_value()
        return str(p_dict)

    def get_field_names(self) -> List:
        return [f.get_name() for f in self.fields_array]

    def is_running(self) -> bool:
        return bool(self['status'] == PrStatus.STATUS_RUNNING.value)


class ProcInfoList(list):
    def refresh(self):
        from psutil import process_iter

        self.clear()
        for p in process_iter():
            self.append(ProcInfo(p))

    def __init__(self):
        super().__init__()
        self._only_active = False
        self._sort_fields = []
        self.refresh()

    @property
    def only_active(self) -> bool:
        return self._only_active

    @only_active.setter
    def only_active(self, value: bool):
        self._only_active = value

    @property
    def sort_fields(self) -> List:
        return self._sort_fields

    @sort_fields.setter
    def sort_fields(self, value: str):
        self._sort_fields.append(value)

    def sorting(self):
        self.sort(key=operator.itemgetter(*self.sort_fields), reverse=True)

    def kill_proc(self, pid: int):
        for p in self:
            if int(p['pid']) == pid:
                p.proc.terminate()

    def show(self):
        self.sorting()
        for pr in self:
            if not self.only_active or pr.is_running():
                print(pr)


info_list = ProcInfoList()
inp = input('Хотите видеть только активные процессы (1) или все (2)?:')
info_list.only_active = bool(inp == '1')

while True:
    inp = input(f'По какому полю хотите сортировать {info_list[0].get_field_names()}?:')
    if len(inp) > 0:
        info_list.sort_fields = inp
    else:
        break

print('Сортирую по:', info_list.sort_fields)
info_list.show()

inp = int(input('Укажите pid процесса, который вы хотите завершить:'))
info_list.kill_proc(inp)
info_list.refresh()
info_list.show()
