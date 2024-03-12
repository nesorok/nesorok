from win32process import EnumProcesses, GetProcessMemoryInfo, EnumProcessModules, GetModuleFileNameEx
from win32api import OpenProcess, TerminateProcess

PROCESS_ALL_ACCESS = 0xFFFF

for pid in EnumProcesses():
    try:
        handle = OpenProcess(PROCESS_ALL_ACCESS, False, pid)
        modules = EnumProcessModules(handle)
        files = set([GetModuleFileNameEx(handle, x) for x in modules])
        print(pid, files)
    except BaseException as e:
        if e.args[2] not in (['Access is denied.', 'The parameter is incorrect.']):
            print(pid, e.args)

print('====================================')
handle = OpenProcess(PROCESS_ALL_ACCESS, False, 8480)
print(GetProcessMemoryInfo(handle))
TerminateProcess(handle, 1)
