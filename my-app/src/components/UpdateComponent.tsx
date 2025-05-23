import { useCallback, useEffect, useState } from 'react'
import GlassBox from './GlassBox'
import Section from './Section'

function UpdateComponent() {
  const [checking, setChecking] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [updateInfo, setUpdateInfo] = useState<{ version: string; releaseNotes?: React.ReactNode } | null>(null)
  const [currentVersion, setCurrentVersion] = useState("")
  const [progress, setProgress] = useState(0)
  
  // Define event handlers outside of useEffect using useCallback
  const handleUpdateAvailable = useCallback((_event: Electron.IpcRendererEvent, info: { version: string; releaseNotes?: string }) => {
    setUpdateAvailable(true)
    setUpdateInfo(info)
  }, [])
  
  const handleDownloadProgress = useCallback((_event: Electron.IpcRendererEvent, progressInfo: { percent: number }) => {
    setProgress(progressInfo.percent)
  }, [])
  
  const handleUpdateDownloaded = useCallback(() => {
    setDownloading(false)
  }, [])
  
  useEffect(() => {
    // Get current version
    window.ipcRenderer.invoke('get-app-version').then(version => {
      setCurrentVersion(version)
      setUpdateAvailable(true)
      setUpdateInfo({ version: "1.1.4", releaseNotes: <h2>This is a test update</h2> })
    })
    // Listen for update events with stored references to handlers
    window.ipcRenderer.on('update-available', handleUpdateAvailable)
    window.ipcRenderer.on('download-progress', handleDownloadProgress)
    window.ipcRenderer.on('update-downloaded', handleUpdateDownloaded)
    
    return () => {
      // Clean up listeners - properly passing both channel and handler
      window.ipcRenderer.off('update-available', handleUpdateAvailable)
      window.ipcRenderer.off('download-progress', handleDownloadProgress)
      window.ipcRenderer.off('update-downloaded', handleUpdateDownloaded)
    }
  }, [handleUpdateAvailable, handleDownloadProgress, handleUpdateDownloaded])
  
  const checkForUpdates = async () => {
    setChecking(true)
    try {
      const result = await window.ipcRenderer.invoke('check-for-updates')
      if (result.version.equals(currentVersion)) {
        setUpdateAvailable(false)
        setChecking(false)
        return
      }
      setUpdateAvailable(result.updateAvailable)
      setUpdateInfo(result)
      setChecking(false)
    } catch (error) {
      console.error(error)
      setChecking(false)
    }
  }
  
  const downloadUpdate = async () => {
    setDownloading(true)
    try {
      await window.ipcRenderer.invoke('download-update')
    } catch (error) {
      console.error(error)
      setDownloading(false)
    }
  }
  
  const installUpdate = () => {
    window.ipcRenderer.send('install-update')
  }
  
    return (
        <Section>
            <GlassBox className='border rounded-r-2xl shadow shadow-white/70 overflow-y-auto'>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Application Updates</h2>
                    <p>Current Version: {currentVersion}</p>

                    <div className="mt-4 space-y-2">
                      <button 
                        onClick={checkForUpdates} 
                        disabled={checking}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                      >
                        {checking ? "Checking..." : "Check for Updates"}
                      </button>

                      {updateAvailable && (
                        <div className="text-black mt-4 p-4 border rounded bg-green-100 flex flex-col">
                          <p className="font-medium">Update Available: {updateInfo?.version}</p>
                          {updateInfo?.releaseNotes && (
                            <div className="mt-2 flex">
                              {updateInfo.releaseNotes}
                            </div>
                          )}

                          <button
                            onClick={downloadUpdate}
                            disabled={downloading}
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                          >
                            {downloading ? `Downloading (${progress.toFixed(0)}%)` : "Download Update"}
                          </button>
                      
                          {progress === 100 && (
                            <button
                              onClick={installUpdate}
                              className="ml-2 px-4 py-2 bg-purple-500 text-white rounded"
                            >
                              Install & Restart
                            </button>
                          )}
                        </div>
                      )}

                      {!updateAvailable && !checking && (
                        <p className="text-green-500">You have the latest version!</p>
                      )}
                    </div>
            </div>
        </GlassBox>
    </Section>
  )
}

export default UpdateComponent